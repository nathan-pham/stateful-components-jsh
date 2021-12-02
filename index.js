const h = (tag, props={}, children=[]) => {
  // create the element
  const element = document.createElement(tag)

  // loop through the props
  for(const [key, value] of Object.entries(props)) {

    // if the prop starts with "on" then add it is an event listener
    // otherwise just set the attribute
    if(key.startsWith("on")) {
      element.addEventListener(key.substring(2).toLowerCase(), value)
    } else {
      element.setAttribute(key, value)
    }
  }

  // loop through the children
  for(const child of children) {

    // if the child is a string then add it as a text node
    // otherwise just add it as an element
    if(typeof child == "string") {
      const text = document.createTextNode(child)
      element.appendChild(text)
    } else {
      element.appendChild(child)
    }
  }

  // return the element
  return element
}

const elements = new Proxy({}, { get: (_, tag) => (props, ...children) => h(tag, props, children) })

export default elements
export const wrap = type => (props, ...children) => h(type, props, children)