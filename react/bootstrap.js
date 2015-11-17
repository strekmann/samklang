import React from "react";
import ReactDOM from "react-dom";
import alt from "./alt";
import Iso from "iso";
import moment from "moment";

var bootstrap = function(module){
    if (typeof window !== "undefined"){
        moment.locale(document.documentElement.getAttribute("lang"));
        Iso.bootstrap(function(state, meta, container){
            alt.bootstrap(state);
            ReactDOM.render(React.createElement(module), container);
        });
    }
};

export default bootstrap;
