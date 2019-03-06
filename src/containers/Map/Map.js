import React, { Component } from "react";
import Bowser from "bowser";
import { SpatialProcessor } from "@evergis/sp-api/SpatialProcessor";
import { Bbox } from "sgis/Bbox";
import { Polygon } from "sgis/features/Polygon";
import { FeatureLayer } from "sgis/layers/FeatureLayer";
import { PointSymbol } from "sgis/symbols/point/Point";
import { StaticImageSymbol } from "sgis/symbols/point/StaticImageSymbol";
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
import { webMercator } from "sgis/Crs";

import { Helmet } from "../../components/Helmet/Helmet";
import { OutsideLink } from "../../components/OutsideLink/OutsideLink";
import { FlowerIcon } from "../../components/SvgIcons/FlowerIcon";
import { HeatmapLayer } from "../../components/HeatmapLayer/HeatmapLayer";

import locationPin from "./location.png";
import { getElementWidthAndHeight } from "../../utils/dom";
import { ViewportHeight } from "../../components/ViewportHeight/ViewportHeight";
import selectedPin from "./flpin42_select.png";
import { MapWrapper, FilterButton, Error, Swiper } from "./styled";
import { License } from "../../components/License/License";
import { Filters } from "../../components/Filters/Filters";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { Controls } from "../../components/Controls/Controls";
import { LocationDialog } from "../../components/LocationDialog/LocationDialog";
import { InfoDialog } from "../../components/InfoDialog/InfoDialog";

const baseLayer = "2gis";

const flowerShopsLayer = "layer_02531cf0f3064520a348f73a8d214ab0";

const heatmapLayers = {
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
  constructor(props) {
    super(props);

    const browser = Bowser.getParser(window.navigator.userAgent);
    const { parsedResult } = browser;
    const { platform } = parsedResult;
    const isMobile = platform.type === "mobile";

    this.state = {
      selectedObjectIndex: 0,
      objects: [],
      dayWeek: 5,
      locationDialogIsOpen: false,
      infoDialogIsOpen: false,
      interestByDay: true,
      flowerShops: true,
      filtersIsVisible: true,
      hasError: false,
      panelHeight: 0,
      isMobile
    };
  }

  selectedSymbol = new StaticImageSymbol({
    width: 42,
    height: 42,
    anchorPoint: [21, 21],
    source: selectedPin
  });

  locationSymbol = new StaticImageSymbol({
    width: 14,
    height: 14,
    anchorPoint: [7, 7],
    source: locationPin
  });

  layer = new FeatureLayer();
  currentLocationLayer = new FeatureLayer();
  heatmapLayer = null;
  panel = null;

  componentDidMount() {
    this.mapOffset();
    window.addEventListener("resize", this.mapOffset);
    this.init();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.mapOffset);
    this.map.off("click", this.onMapClick);
  }

  componentDidUpdate(prevProps, { selectedObjectIndex: prevSelectedObjectIndex }) {
    const { selectedObjectIndex, objects } = this.state;

    if (prevSelectedObjectIndex !== selectedObjectIndex) {
      const nextObject = objects[selectedObjectIndex];
      const nextPosition = nextObject && nextObject.position;

      if (nextPosition) {
        this.setSelectedSymbol(nextPosition);
      }
    }
  }

  setLocationPoint = currentCoordinate => {
    const Point = new PointFeature(currentCoordinate, webMercator, {
      symbol: this.locationSymbol,
      crs: this.map.crs
    });

    this.currentLocationLayer.features = [];
    this.currentLocationLayer.add([Point]);
  };

  setSelectedSymbol = position => {
    const Point = new PointFeature(position, {
      symbol: this.selectedSymbol,
      crs: this.map.crs
    });
    this.layer.features = [];
    this.layer.add([Point]);
  };

  goToLocation = () => {
    navigator.geolocation.getCurrentPosition(
      location => {
        const currentCoordinate = [location.coords.latitude, location.coords.longitude];
        this.onZoomToPoints(currentCoordinate, this.map.minResolution);
        this.setLocationPoint(currentCoordinate);
      },
      () => {
        this.setState({ locationDialogIsOpen: false });
      }
    );
  };

  onZoomToPoints = (position = [55.7417, 37.6275], zoom = 8) =>
    this.map.animateTo(new PointFeature(position), zoom);

  setObjects = features => {
    if (features.length === 0) {
      this.layer.features = [];
      this.setState({ objects: [], selectedObjectIndex: 0 });
    } else {
      const objects = [];
      features.forEach((feature, index) => {
        const { attributes, bbox, position } = feature;
        const { name, address, site, site_2gis, phone, work_time, weight } = attributes;
        const { xMin, xMax, yMax, yMin } = bbox;

        if (index === 0) {
          this.setSelectedSymbol(position);
        }

        objects.push({
          weight,
          position,
          name,
          address,
          site,
          site_2gis,
          phone,
          work_time,
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

  onMapClick = ({ point }) => {
    const { flowerShops } = this.state;

    if (!flowerShops) {
      return;
    }

    const resolution = this.map.resolution;

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
        services: [flowerShopsLayer]
      })
      .then(features => this.setObjects(features))
      .catch(error => {
        console.error(error);
        this.setState({ hasError: true });
      });
  };

  mapOffset = () => {
    if (this.panel) {
      const { height } = getElementWidthAndHeight(this.panel);
      this.setState({ panelHeight: height });
    }
  };

  init() {
    const { dayWeek } = this.state;

    const browser = Bowser.getParser(window.navigator.userAgent);
    const { parsedResult } = browser;
    const { platform, os } = parsedResult;
    const isMobile = platform.type === "mobile";
    const isTablet = platform.type === "tablet";
    const isIos = os.name === "iOS";

    if ((isMobile || isTablet) && isIos) {
      navigator.geolocation.getCurrentPosition(
        () => {
          this.setState({
            locationDialogIsOpen: false
          });
        },
        () => {
          this.setState({ locationDialogIsOpen: true });
        }
      );
    } else {
      navigator.permissions.query({ name: "geolocation" }).then(({ state }) => {
        // granted prompt denied
        if (state !== "granted") {
          this.setState({ locationDialogIsOpen: true });
        }
      });
    }

    const sp = new SpatialProcessor({
      url: "https://public.everpoint.ru/sp/",
      services: [baseLayer, flowerShopsLayer],
      mapWrapper: this.wrapper
    });

    const { map, painter, layerManager } = sp;

    map.maxResolution = 9444;
    map.on("click", this.onMapClick);
    map.addLayer(this.layer);
    map.addLayer(this.currentLocationLayer);
    this.map = map;
    this.sp = sp;
    this.painter = painter;
    this.layerManager = layerManager;
    this.layerManager.ready
      .then(() => {
        this.setHeatmapLayer(heatmapLayers[dayWeek].hm);
      })
      .catch(error => {
        console.error(error);
        this.setState({ hasError: true });
      });
  }

  setHeatmapLayer = name => {
    const colors = ["#000000ff", "#808702e0", "#a3de0099", "#baff2600", "#d9ff7800", "#edf0f922"];
    const breaks = "0,0.2,0.35,0.5,0.75,1";

    const colorsParam =
      "[" +
      colors.map(color => "'" + new Color(color).toString("hex").replace("#", "") + "'").join(",") +
      "]";

    if (this.map.layers[0].contains(this.heatmapLayer)) {
      this.map.layers[0].removeLayer(this.heatmapLayer);
    }

    this.heatmapLayer = new HeatmapLayer({
      serviceUrl: this.sp.connector.url + name,
      options: {
        pointGrowRadius: "10",
        attribute: "",
        breaks: "[" + breaks + "]",
        colors: colorsParam
      }
    });

    this.map.layers[0].insertLayer(this.heatmapLayer, 1);
  };

  onRefMapWrapper = ref => (this.wrapper = ref);

  onZoom = value => {
    this.map.zoom(value);
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

  onFilterChange = (value, name) => {
    const { dayWeek } = this.state;

    this.setState(
      {
        [name]: value
      },
      () => {
        if (name === "interestByDay") {
          this.mapOffset();
          if (value) {
            this.setHeatmapLayer(heatmapLayers[dayWeek].hm);
          } else {
            if (this.map.layers[0].contains(this.heatmapLayer)) {
              this.map.layers[0].removeLayer(this.heatmapLayer);
            }
          }
        } else if (name === "dayWeek") {
          this.setHeatmapLayer(heatmapLayers[value].hm);
        } else if (name === "flowerShops") {
          this.onServiceDisplay(flowerShopsLayer, value);
          this.mapOffset();

          if (!value) {
            this.onCloseObjectCard();
          }
        }
      }
    );
  };

  onServiceDisplay = (layerName, displayed) => {
    const services = this.layerManager.getServices(true);

    const layersIsNotLoaded = !services.some(({ name }) => name === layerName);

    if (layersIsNotLoaded) {
      this.layerManager.loadService(layerName);
    }

    services.forEach(({ layer, name }) => {
      if (name === layerName) {
        layer.isDisplayed = displayed;
      }
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  onEnableGeolocation = () =>
    navigator.geolocation.getCurrentPosition(
      () => {
        this.setState({
          locationDialogIsOpen: false
        });
      },
      error => {
        console.error(error.message);
        this.setState({
          locationDialogIsOpen: false
        });
      }
    );

  onToggleFilters = () => this.setState({ filtersIsVisible: !this.state.filtersIsVisible });

  onSwipedFilters = ({ isDown, yRatio }) => {
    if (isDown && yRatio > 40) {
      this.onToggleFilters();
    }
  };

  onSwipedInfoDialog = ({ isDown, yRatio }) => {
    if (isDown && yRatio > 40) {
      this.setState({ infoDialogIsOpen: false });
    }
  };

  onSwipedLocationDialog = ({ isDown, yRatio }) => {
    if (isDown && yRatio > 40) {
      this.setState({ locationDialogIsOpen: false });
    }
  };

  onRefPanel = ref => {
    if (ref) {
      this.panel = ref;
    }
  };

  render() {
    const {
      dayWeek,
      objects,
      selectedObjectIndex,
      locationDialogIsOpen,
      infoDialogIsOpen,
      interestByDay,
      flowerShops,
      filtersIsVisible,
      hasError,
      panelHeight,
      isMobile
    } = this.state;

    if (hasError) {
      return (
        <Error>
          Houston, we have a problem.
          <br />
          <OutsideLink style={{ fontSize: 20 }} href="https://mar8.everpoint.ru/" target="_self">
            перезагрузить страницу
          </OutsideLink>
        </Error>
      );
    }

    return (
      <Swiper preventDefaultTouchmoveEvent={objects.length === 0}>
        <MapWrapper
          innerRef={this.onRefMapWrapper}
          style={{ height: `calc(100% - ${isMobile && filtersIsVisible ? panelHeight : 0}px)` }}
        >
          <Helmet />
          <ViewportHeight />
          <FilterButton onClick={this.onToggleFilters}>
            <FlowerIcon />
          </FilterButton>
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
            openInfoDialog={e => {
              e.preventDefault();
              this.setState({ infoDialogIsOpen: true });
            }}
          />
          <LocationDialog
            onSwiped={this.onSwipedLocationDialog}
            onEnableGeolocation={this.onEnableGeolocation}
            isOpen={locationDialogIsOpen}
            onCloseRequest={() => this.setState({ locationDialogIsOpen: false })}
          />
          <InfoDialog
            onSwiped={this.onSwipedInfoDialog}
            isOpen={infoDialogIsOpen}
            onCloseRequest={() => this.setState({ infoDialogIsOpen: false })}
          />
          <License />
        </MapWrapper>
        <Filters
          onRefPanel={this.onRefPanel}
          onSwiped={this.onSwipedFilters}
          dayWeek={dayWeek}
          interestByDay={interestByDay}
          flowerShops={flowerShops}
          isVisible={filtersIsVisible && objects.length === 0}
          onFilterChange={this.onFilterChange}
          onZoomToPoints={this.onZoomToPoints}
          onToggleFilters={this.onToggleFilters}
        />
      </Swiper>
    );
  }
}
