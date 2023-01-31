// var templates_list = require("../data/templates.json");
// var audio_list = require("../data/audios.json");
var product_data = require("../data/products.json");
var product_urls = require("../data/productUrls.json");
var items = require("../data/Items.json");
// let search_result = require("../../components/CategoriesData")

function get_mock_response(url, method, data) {
  if (url === "/search") {
    console.log("Fetch search results for category", data.category);
    console.log(method);
    var response = {
      data: {
        results: product_urls.filter((item) => data.category == item.category),
      },
      status: 200,
    };
    return response;
  } else if (url === "/recreate") {
    // var products = items.filter((item) => item.unique_name == id);
    var response = {
      data: {
        objectCopy: JSON.parse(JSON.stringify(items)),
        // objectCopy: items,
      },
    };
    // var objectCopy = JSON.parse(JSON.stringify(items));

    // console.log(objectCopy);
    return response;
  } else if (url === "/sendInfo") {
    console.log("data To Backend", data);
    var response = { data: data };

    return response;
  } else {
    throw "Undefined url.";
  }
}

export function api_mock(url, method, data) {
  return new Promise((resolve) => {
    // wait 3s before calling fn(par)
    setTimeout(() => resolve(get_mock_response(url, method, data)), 1000);
  });
}
