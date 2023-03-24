(()=>{"use strict";var e=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();var t=combineReducers({data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{mode:"page-title",domains:[],domain:"",ref:null,xpath:null,regex:null,delay:0},t=arguments[1];switch(t.type){case"SET_DATA":e=Object.assign({},e,t.payload)}return e}}),a=createStore(t);weh.rpc.listen({setData:function(e){a.dispatch({type:"SET_DATA",payload:e})}});var n=connect((function(e,t){return{data:e.data}}))(function(t){function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={selected:"",mode:"page-title",domain:"",domains:[],xpath:null,regex:null,delay:0,advanced:!1,regexpClass:"",xpathClass:"",delayClass:""},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,React.Component),e(a,[{key:"componentWillReceiveProps",value:function(e){"page-content"==e.data.mode&&e.data.xpath!==this.state.xpath&&weh.rpc.call("selectSmartNameXPath",e.data.ref,e.data.xpath);for(var t=[],a=e.data.domain.split("."),n=0;n<a.length-1;n++)t.push(a.slice(n).join("."));var r=t[0];t.indexOf(this.state.domain)>=0&&(r=this.state.domain);var l=this;this.setState({selected:"",mode:e.data.mode||"page-content",xpath:e.data.xpath,xpathClass:"",regexp:".*",regexpClass:"",domains:t,domain:r},(function(){l.evaluate(e)})),window.addEventListener("beforeunload",(function(){weh.rpc.call("closedSmartNameDefiner",l.props.data.ref)}))}},{key:"evaluate",value:function(e){e=e||this.props;var t=this;weh.rpc.call("evaluateSmartName",e.data.ref,{mode:this.state.mode,xpath:this.state.xpath,regexp:this.state.regexp}).then((function(e){t.setState({selected:e||""})})).catch((function(e){t.setState({selected:""})}))}},{key:"save",value:function(){var e=this;return function(){weh.rpc.call("addSmartNameRule",{domain:e.state.domain,mode:e.state.mode,xpath:e.state.xpath,regexp:e.state.regexp,delay:e.state.delay}).then((function(){weh.rpc.call("closeSmartNameDefiner")}))}}},{key:"onChange",value:function(e){var t=this;return function(a){if("advanced"===e)return t.setState({advanced:a.target.checked});var n=a.target.value,r={},l=!1;switch(e){case"mode":r.mode=n;break;case"xpath":r.xpath=n;try{document.evaluate(n,document,null,XPathResult.STRING_TYPE,null),r.xpathClass="",weh.rpc.call("selectSmartNameXPath",t.props.data.ref,n)}catch(e){r.xpathClass="error",l=!0}break;case"regexp":r.regexp=n;try{new RegExp(n),r.regexpClass=""}catch(e){r.regexpClass="error",l=!0}break;case"domain":r.domain=n;break;case"delay":r.delay=n,/^[0-9]+$/.test(n)?r.delayClass="":r.delayClass="error"}t.setState(r,(function(){!l&&["mode","xpath","regexp"].indexOf(e)>=0&&t.evaluate()}))}}},{key:"renderParams",value:function(){var e=this.state.domains.map((function(e){return React.createElement("option",{key:e,value:e},e)}));return React.createElement("div",{className:"container"},React.createElement("div",{className:"form-group row"},React.createElement("label",{className:"col-form-label col-sm-4"},weh._("smartnamer_domain")),React.createElement("select",{className:"form-control col-sm-8",onChange:this.onChange("domain"),value:this.state.domain},e)),React.createElement("div",{className:"form-group row"},React.createElement("select",{className:"form-control col-sm-12",onChange:this.onChange("mode"),value:this.state.mode},React.createElement("option",{value:"header-url"},weh._("smartnamer_get_name_from_header_url")),React.createElement("option",{value:"page-title"},weh._("smartnamer_get_name_from_page_title")),React.createElement("option",{value:"page-content"},weh._("smartnamer_get_name_from_page_content")),React.createElement("option",{value:"obfuscated"},weh._("smartnamer_get_obfuscated_name")))),this.state.advanced&&React.createElement("div",null,React.createElement("div",{className:"form-group row"},React.createElement("label",{className:"col-form-label col-sm-12"},weh._("smartnamer_xpath_expr")),React.createElement("textarea",{className:"form-control col-sm-12 "+this.state.xpathClass,rows:"2",onChange:this.onChange("xpath"),value:this.state.xpath})),React.createElement("div",{className:"form-group row"},React.createElement("label",{className:"col-form-label col-sm-6"},weh._("smartnamer_regexp")),React.createElement("input",{className:"form-control col-sm-6 "+this.state.regexpClass,onChange:this.onChange("regexp"),type:"text",value:this.state.regexp})),React.createElement("div",{className:"form-group row"},React.createElement("label",{className:"col-form-label col-sm-6"},weh._("smartnamer_delay")),React.createElement("input",{className:"form-control col-sm-6 "+this.state.delayClass,onChange:this.onChange("delay"),type:"text",value:this.state.delay}))))}},{key:"render",value:function(){return React.createElement("div",{className:"smartname-definer"},React.createElement(WehHeader,{title:weh._("smartname_define")}),React.createElement("header",null,React.createElement("div",{className:"container"},React.createElement("div",{className:"form-group row"},React.createElement("input",{className:"form-control col-sm-12",title:weh._("smartnamer_selected_text"),type:"text",disabled:!0,value:this.state.selected})))),React.createElement("main",null,this.renderParams()),React.createElement("footer",null,React.createElement("div",{className:"btn-toolbar"},React.createElement("div",{className:"row"},React.createElement("input",{id:"advanced",className:"form-control col-sm-1",type:"checkbox",onChange:this.onChange("advanced"),checked:this.state.advanced}),React.createElement("label",{htmlFor:"advanced",className:"col-form-label col-sm-10"},weh._("advanced"))),React.createElement("div",{className:"btn-group pull-right"},React.createElement("button",{type:"button",onClick:this.save(),disabled:this.state.xpathClass||this.state.regexpClass||this.state.delayClass,className:"btn btn-primary"},weh._("save"))))))}}]),a}());render(React.createElement(Provider,{store:a},React.createElement("div",{className:"weh-shf"},React.createElement(n,null))),document.getElementById("root")),weh.setPageTitle(weh._("smartname_define"))})();