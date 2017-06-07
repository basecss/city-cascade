;(function () {

  'use strict'

  function query (selector) {
    return document.querySelector(selector)
  }

  var provinceElement = query('#province')
  var cityElement = query('#city')
  var countyElement = query('#county')
  var cityData

  // fill select options
  function selectFill (data, element) {
    var html = data.length ? data.map(function (item) {
      return '<option value="' + item.name + '">' + item.name + '</option>'
    }).join('') : ''
    element.innerHTML = html
  }
  selectFill(sourceData, provinceElement)

  // update select
  function update () {
    var id = this.id
    var currValue = this.value
    if (id === 'province') {
      cityData = sourceData.filter(function (item) {
        return item.name === currValue
      })
      cityData = cityData.length ? cityData[0]['sub'] : []
      selectFill(cityData, cityElement)
      selectFill([], countyElement)
    } else if (id === 'city') {
      var countyData = cityData.filter(function (item) {
        return item.name === currValue
      })
      countyData = countyData[0]['sub'] ? countyData[0]['sub'] : []
      selectFill(countyData, countyElement)
    }
  }

  // change event
  province.addEventListener('change', update, false)
  city.addEventListener('change', update, false)

})()
