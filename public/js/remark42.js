var remark_config = {
	host: 'https://remark42.ivandimitrov.co.uk',
	site_id: 'ivandimitrov',
	theme: `${window.localStorage.getItem("theme")}`,
}
!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);

