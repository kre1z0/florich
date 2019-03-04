import React, { Component } from "react";
import { SpatialProcessor } from "@evergis/sp-api/SpatialProcessor";
import { Bbox } from "sgis/Bbox";
import { Polygon } from "sgis/features/Polygon";
import { FeatureLayer } from "sgis/layers/FeatureLayer";
import { PointSymbol } from "sgis/symbols/point/Point";
import { MaskedImage } from "sgis/symbols/point/MaskedImage";
import { PointFeature } from "sgis/features/PointFeature";
import { Connector } from "evergis/Connector";
import { DataViewService } from "evergis/services/DataViewService";
import { LayerGroup } from "sgis/LayerGroup";
import { MapService } from "evergis/services/MapService";
import { ServiceContainer } from "evergis/services/ServiceContainer";
import { ServiceGroupService } from "evergis/services/ServiceGroupService";
import { StaticSourceService } from "evergis/services/StaticSourceService";
import { TileService } from "evergis/services/TileService";
import { Color } from "sgis/utils/Color";

import { FlowerIcon } from "../../components/SvgIcons/FlowerIcon";
import { HeatmapLayer } from "../../components/HeatmapLayer/HeatmapLayer";
import circleBack from "./circle_back.png";
import starImage from "./star.png";
import { MapWrapper, FilterButton } from "./styled";
import { License } from "../../components/License/License";
import { Filters } from "../../components/Filters/Filters";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { Controls } from "../../components/Controls/Controls";
import { LocationDialog } from "../../components/LocationDialog/LocationDialog";
import { InfoDialog } from "../../components/InfoDialog/InfoDialog";

const baseLayer = "2gis";

const layers = {
  4: {
    hm: "layer_bfe876efa2234fa589b12ac08821da40"
  },
  5: {
    hm: "layer_ab2004f1c6e2406cb93808c94817c769"
  },
  6: {
    hm: "layer_a1d584770410408e82be6854b9d24fe8"
  },
  7: {
    hm: "layer_e6b67213e70044a6a63d157c9e39b03c"
  },
  8: {
    hm: "layer_583456c8470741c79a792c4917ddd16d"
  }
};

export class Map extends Component {
  state = {
    resolution: 200,
    zoomLvl: 9,
    selectedFilter: "1",
    selectedType: "fish",
    selectedObjectIndex: 0,
    objects: [],
    // new
    dayWeek: 5,
    currentCoordinate: null,
    locationDialogIsOpen: false,
    infoDialogIsOpen: false,
    interestByDay: true,
    flowerShops: true,
    filtersIsVisible: true
  };

  selectedSymbol = new MaskedImage({
    width: 32,
    height: 32,
    anchorPoint: [16, 16],
    imageSource: circleBack,
    maskSource: starImage,
    maskColor: "#e00f00"
  });

  layer = new FeatureLayer();

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.map.off("bboxChangeEnd", this.onBboxChangeEnd);
    this.map.off("click", this.onMapClick);
  }

  componentDidUpdate(
    prevProps,
    {
      selectedObjectIndex: prevSelectedObjectIndex,
      dayWeek: prevDayWeek,
      interestByDay: prevInterestByDay
    }
  ) {
    const { selectedObjectIndex, objects, dayWeek, interestByDay } = this.state;

    if (prevSelectedObjectIndex !== selectedObjectIndex) {
      const nextObject = objects[selectedObjectIndex];
      const nextPosition = nextObject && nextObject.position;

      if (nextPosition) {
        this.setSelectedSymbol(nextPosition);
      }
    }

    if (prevDayWeek !== dayWeek) {
      this.setHeatmapLayer(layers[dayWeek].hm);
    }

    if (prevInterestByDay !== interestByDay) {
      if (interestByDay) {
        this.setHeatmapLayer(layers[dayWeek].hm);
      } else {
        this.layerGroup.layers = [];
      }
    }
  }

  setObjects = features => {
    if (features.length === 0) {
      this.layer.features = [];
      this.setState({ objects: [], selectedObjectIndex: 0 });
    } else {
      const objects = [];
      features.forEach((feature, index) => {
        const { attributes, bbox, position } = feature;
        const { name, address, site, site_2gis, phone, rubrics_te } = attributes;
        const { xMin, xMax, yMax, yMin } = bbox;

        if (index === 0) {
          this.setSelectedSymbol(position);
        }

        objects.push({
          position,
          name,
          address,
          site,
          site_2gis,
          phone,
          rubrics_te,
          extent: {
            xMin,
            xMax,
            yMax,
            yMin
          }
        });
      });

      this.setState({ objects, selectedObjectIndex: 0 });
    }
  };

  setSelectedSymbol = position => {
    const Point = new PointFeature(position, { symbol: this.selectedSymbol, crs: this.map.crs });
    this.layer.features = [];
    this.layer.add([Point]);
  };

  onMapClick = ({ point }) => {
    const { selectedFilter, selectedType } = this.state;

    if (selectedType === "fish") return;

    const resolution = this.map.resolution;

    const service = layers[selectedFilter][selectedType];

    const buffer = resolution * 20;
    const geometry = new Polygon(
      [
        [
          [point.x - buffer, point.y - buffer],
          [point.x + buffer, point.y - buffer],
          [point.x + buffer, point.y + buffer],
          [point.x - buffer, point.y + buffer]
        ]
      ],
      { crs: point.crs }
    );

    this.sp.connector.api
      .pickByGeometry({
        geometry,
        resolution,
        services: [service]
      })
      .then(features => this.setObjects(features))
      .catch(error => console.error(error));
  };

  init() {
    const { resolution, selectedType, selectedFilter } = this.state;

    navigator.permissions.query({ name: "geolocation" }).then(({ state }) => {
      // granted prompt denied
      if (state !== "granted") {
        this.setState({ locationDialogIsOpen: true });
      } else {
      }
    });

    const sp = new SpatialProcessor({
      url: "http://public.everpoint.ru/sp/",
      services: [baseLayer],
      mapWrapper: this.wrapper
    });

    const { map, painter, layerManager } = sp;

    map.maxResolution = 9444;
    map.on("bboxChangeEnd", this.onBboxChangeEnd);
    map.on("click", this.onMapClick);
    map.addLayer(this.layer);
    this.map = map;
    this.sp = sp;
    this.painter = painter;
    this.layerManager = layerManager;

    this.layerGroup = new LayerGroup();
    this.map.insertLayer(this.layerGroup, 1);
    this.setHeatmapLayer(layers[4].hm);
  }

  setHeatmapLayer = name => {
    const colors = ["#000000ff", "#808702e0", "#a3de0099", "#baff2600", "#d9ff7800", "#edf0f922"];
    const breaks = "0,0.2,0.35,0.5,0.75,1";

    const colorsParam =
      "[" +
      colors.map(color => "'" + new Color(color).toString("hex").replace("#", "") + "'").join(",") +
      "]";

    const layer = new HeatmapLayer({
      serviceUrl: this.sp.connector.url + name,
      options: {
        pointGrowRadius: "10",
        attribute: "",
        breaks: "[" + breaks + "]",
        colors: colorsParam
      }
    });

    this.layerGroup.layers = [];
    this.layerGroup.addLayer(layer);
  };

  filterLayersByType = prevType => {
    const { selectedFilter, selectedType } = this.state;

    const hideLayerName = layers[selectedFilter][prevType];
    const visibleLayerName = layers[selectedFilter][selectedType];

    const services = this.layerManager.getServices(true);

    const layersIsNotLoaded = !services.some(({ name }) => name === visibleLayerName);

    if (layersIsNotLoaded) {
      this.layerManager.loadService(visibleLayerName);
    }

    services.forEach(({ layer, name }) => {
      if (name === hideLayerName) {
        layer.isDisplayed = false;
      } else if (name === visibleLayerName) {
        layer.isDisplayed = true;
      }
    });
  };

  filterLayersByValue = prevValue => {
    const { selectedFilter, selectedType } = this.state;

    const services = this.layerManager.getServices(true);
    const prevLayerName = layers[prevValue][selectedType];
    const nextLayerName = layers[selectedFilter][selectedType];
    const nextLayerIsNotLoaded = !services.some(({ name }) => name === nextLayerName);

    if (nextLayerIsNotLoaded) {
      this.layerManager.loadService(nextLayerName);
    }

    services.forEach(({ layer, name }) => {
      if (name === prevLayerName) {
        layer.isDisplayed = false;
      } else if (name === nextLayerName) {
        layer.isDisplayed = true;
      }
    });
  };

  onBboxChangeEnd = () => {
    const resolution = this.map.resolution;
    const zoomLvl = this.getLevel(resolution);
    const isGridZoomLvl = zoomLvl < 14 || zoomLvl === 0;

    this.setState({
      zoomLvl: this.getLevel(resolution),
      resolution,
      selectedType: zoomLvl < 14 || zoomLvl === 0 ? "fish" : "poi"
    });

    if (isGridZoomLvl) {
      this.onCloseObjectCard();
    }
  };

  onRefMapWrapper = ref => (this.wrapper = ref);

  onZoom = value => {
    this.map.zoom(value);
  };

  onZoomToPoints = (position = [55.7417, 37.6275], zoom = 8) =>
    this.map.animateTo(new PointFeature(position), zoom);

  getLevel = resolution => {
    const index = this.map && this.map.tileScheme.getLevel(resolution);

    if (Number.isInteger(+index)) {
      return this.map.tileScheme.levels[index].zIndex;
    }
  };

  zoomToFeature = extent => {
    const { xMin, xMax, yMax, yMin } = extent;
    const bbox = new Bbox([xMin, yMax], [xMax, yMin], this.map.crs);
    this.painter.show(bbox, true);
  };

  onCloseObjectCard = () => {
    this.layer.features = [];
    this.setState({ selectedObjectIndex: 0, objects: [] });
  };

  // onFilterChange = selectedFilter => {
  //   this.setState({ selectedFilter });
  //   this.onCloseObjectCard();
  // };

  onFilterChange = (value, name) => {
    console.info("--> onFilterChange ggwp", name);
    this.setState({ [name]: value });
  };

  onEnableGeolocation = () =>
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        currentCoordinate: [location.coords.latitude, location.coords.longitude],
        locationDialogIsOpen: false
      });
    });

  goToLocation = () => {
    navigator.geolocation.getCurrentPosition(location => {
      const currentCoordinate = [location.coords.latitude, location.coords.longitude];
      this.onZoomToPoints(currentCoordinate, 8);
      this.setState({ currentCoordinate });
    });
  };

  onToggleFilters = () => this.setState({ filtersIsVisible: !this.state.filtersIsVisible });

  render() {
    const {
      dayWeek,
      resolution,
      zoomLvl,

      selectedFilter,
      selectedType,
      objects,
      selectedObjectIndex,
      locationDialogIsOpen,
      infoDialogIsOpen,
      interestByDay,
      flowerShops,
      filtersIsVisible
    } = this.state;

    return (
      <MapWrapper innerRef={this.onRefMapWrapper}>
        <FilterButton onClick={this.onToggleFilters}>
          <FlowerIcon />
        </FilterButton>
        <Filters
          dayWeek={dayWeek}
          interestByDay={interestByDay}
          flowerShops={flowerShops}
          isVisible={filtersIsVisible && objects.length === 0}
          value={selectedFilter}
          onFilterChange={this.onFilterChange}
          onZoomToPoints={this.onZoomToPoints}
          onToggleFilters={this.onToggleFilters}
        />
        <ObjectCard
          isVisible={objects.length}
          currentPage={selectedObjectIndex + 1}
          pageCount={objects.length}
          zoomToFeature={this.zoomToFeature}
          onClose={this.onCloseObjectCard}
          onPrevObject={() => this.setState({ selectedObjectIndex: selectedObjectIndex - 1 })}
          onNextObject={() => this.setState({ selectedObjectIndex: selectedObjectIndex + 1 })}
          {...objects[selectedObjectIndex]}
        />
        <Controls
          onZoom={this.onZoom}
          goToLocation={this.goToLocation}
          openInfoDialog={() => this.setState({ infoDialogIsOpen: true })}
        />
        <LocationDialog
          onEnableGeolocation={this.onEnableGeolocation}
          isOpen={locationDialogIsOpen}
          onCloseRequest={() => this.setState({ locationDialogIsOpen: false })}
        />
        <InfoDialog
          isOpen={infoDialogIsOpen}
          onCloseRequest={() => this.setState({ infoDialogIsOpen: false })}
        />
        <License />
      </MapWrapper>
    );
  }
}
