import { DynamicLayer } from "sgis/layers/DynamicLayer";
import { stringify } from "query-string";

export class HeatmapLayer extends DynamicLayer {
  constructor(properties, extensions) {
    super(properties, extensions);

    this.serviceUrl = properties.serviceUrl;
    this.options = properties.options;
  }

  getUrl(bbox, resolution) {
    const imgWidth = Math.round((bbox.xMax - bbox.xMin) / resolution);
    const imgHeight = Math.round((bbox.yMax - bbox.yMin) / resolution);
    const sr = bbox.crs.toString();

    return (
      this.serviceUrl +
      "/heatmap?" +
      stringify({
        dpi: 96,
        transparent: true,
        bboxSR: sr,
        imageSR: sr,
        size: imgWidth + "," + imgHeight,
        f: "image",
        bbox: bbox.xMin + "," + bbox.yMin + "," + bbox.xMax + "," + bbox.yMax,
        ...this.options
      })
    );
  }
}
