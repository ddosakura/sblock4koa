publish:
	npm config set registry=http://registry.npmjs.org; npm publish; npm config set registry=https://registry.npm.taobao.org/; echo "finish!"