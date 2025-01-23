import guessVisibleColor from "./neuron.js";
var tinycolor = require("tinycolor2");
import chroma from "chroma-js";
import SKPicker from "./modules/picker.js";
import SKStylePicker from "./modules/stylePicker.js";
import { MouseIntersectStyler } from "./CustomStyler.js";

class SKT {
  constructor(cssCb, config, root, patientRoot) {
    this.configTree = config;

    this.init();
  }

  traverseForest(forest, visitFn) {
    forest.forEach((rootNode) => {
      this.traverseTree(rootNode, visitFn);
    });
  }

  traverseTree(node, visitFn) {
    visitFn(node);

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        this.traverseTree(child, visitFn);
      });
    }
  }

  init() {
    this.traverseForest(this.configTree, (node) => {
      console.log(node.name);
    });
  }
}

export { SKT };
