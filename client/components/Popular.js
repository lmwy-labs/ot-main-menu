import React from 'react'

export default class Popular extends React.Component {
  render() {
    const menus_static = ['Dinner', 'Lunch', 'Brunch', 'Bar', 'Dessert', 'Cocktails', 'Cheese'];

    return (
      <ul className='flex-center'>
        {menus_static.map((m) => (
          <li key={m}>
            <button className='btn-clear nav-link'>
              {m}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}