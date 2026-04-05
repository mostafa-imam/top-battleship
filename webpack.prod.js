import { merge } from "webpack-merge";
import { default as common } from "./webpack.common.js";

export default merge(common, {
    mode: "production",
    devtool: "source-map",
})