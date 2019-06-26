function fakeLocation(latitude, longitude) {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, "getCurrentPosition", (cb, err) => {
        if (latitude && longitude) {
          return cb({ coords: { latitude, longitude } });
        }
        throw err({ code: 1 }); // 1: rejected, 2: unable, 3: timeout
      });
    }
  };
}

describe('Determine the location', function() {
  it('navigate to home, without geolocation, should has class .ip-address', function() {
    cy.visit('/', fakeLocation())
    cy.get('.provider').should('have.class', 'ip-address');
  })

  it('navigate to home, use geolocation, should using .geolocation', function() {
    cy.visit('/', fakeLocation(-7.6657767, 110.40520819999999))
    cy.get('.provider').should('have.class', 'geolocation');
  })
})

describe('Checking location from API', function() {
  it('If (lat,long) is Sleman, from API should show location name to Sleman', () => {
    const latitude = -7.6657767;
    const longitude = 110.40520819999999
    cy.visit('/', fakeLocation(latitude, longitude))
    cy.request({
      url: 'https://api.openweathermap.org/data/2.5/weather',
      qs: {
        lat: latitude,
        lon: longitude,
        appid: "7750e1f993872d3a856097bfbcb3a918",
      },
    })
    .its('body')
    .then((data) => {
      cy
      .window()
      .its('store')
      .invoke('dispatch', { type: 'WEATHER_GET_SUCCESS', payload: { data: data}});

      cy.get('.td-location')
        .should('contain', 'Sleman');
    })

  })
})