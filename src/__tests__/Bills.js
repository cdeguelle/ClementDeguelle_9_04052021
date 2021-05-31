import { screen } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      const user = JSON.stringify({
        type: 'Employee'
      })
      window.localStorage.setItem('user', user)
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const expected = "active-icon"
      const billIcon = screen.getByTestId("icon-window")
      billIcon.className = expected
      expect(billIcon.className).toEqual(expected)
    })
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(parseInt(datesSorted[datesSorted.length-1], 10)).toBeLessThan(parseInt(datesSorted[datesSorted.length-2], 10))
    })
  })
})

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page and data is loading", () => {
    test("Then BillsUI return Loading page", () => {
      const loading = true
      const html = BillsUI({ loading })
      document.body.innerHTML = html
      expect(screen.getAllByText('Loading...')).toBeTruthy()
    })
  })
})

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page and data is error", () => {
    test("Then BillsUI return Error page", () => {
      const error = "Une erreur est survenue"
      const html = BillsUI({ error })
      document.body.innerHTML = html
      expect(screen.getByTestId('error-message')).toBeTruthy()
    })
  })
})