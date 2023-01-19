// var templates_list = require("../data/templates.json");
// var audio_list = require("../data/audios.json");
var product_data = require("../data/products.json");
var product_urls = require("../data/productUrls.json");
// let search_result = require("../../components/CategoriesData")

function get_mock_response(url, method, data) {
  if (url === "/recreate/search") {
    console.log("Fetch search results for category", data.category);
    var response = {
      data: {
        results: product_urls.filter((item) => data.category == item.category),
      },
      status: 200,
    };
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
