import axios from 'axios'

// eslint-disable-next-line
export default function api () {
  const resourceUrl = 'https://patient-haze-3407.getsandbox.com'
  // eslint-disable-next-line
  const defaultFunctionForMethods = (stateArrayName: any, itemAttribute: any, method: any, commit:any, item: any, mutations: any): void => {
    axios(resourceUrl + stateArrayName + itemAttribute, {
      method: method,
      data: item
    }).then((response) => {
      commit(mutations, response.data)
    })
      .catch((error) => {
        console.log(error)
      })
  }
  return {
    defaultFunctionForMethods
  }
}
