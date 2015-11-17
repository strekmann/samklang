import React from "react";

var IndexPage = React.createClass({
    displayName: "IndexPage",

    render(){
        return (
            <h1>HEia mamma</h1>
        );
    }
});

import bootstrap from "../bootstrap";
bootstrap(IndexPage);
export default IndexPage;
