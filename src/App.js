import { useEffect, useState } from 'react'
import './App.css'

import data from './json/weights.json'

function App() {
  const [weights, setWeights] = useState([]) // хранение json файла
  //хранение полей формы
  const [form, setForm] = useState({
    selector1: null,
    selector2: null,
    input: ''
  })

  const [dataSubgroup, setDataSubgroup] = useState(null) // хранение заначений для 2 select при изменении 1

  const [result, setResult] = useState('') //Вывод результата

  // Загрузка данных с json
  useEffect(() => {
    setWeights(data)
  }, [])
  // Подгрузка данных во 2 поле взависимости от 1 поля
  useEffect(() => {
    const values = weights[form.selector1]
    setDataSubgroup(values)
    if (values) {
      setForm({
        ...form,
        selector2: Object.keys(values)[0]
      })
      //setSelector2(Object.keys(values)[0])
    }
  }, [form.selector1])
  // Функция подтверждения формы
  const formSubmit = (event) => {
    event.preventDefault()
    const formatter = new Intl.NumberFormat('ru')
    const result = formatter.format(
      Number(weights[form.selector1][form.selector2][0].value) * Number(form.input)
    )
    setResult(result)
  }

  return (
    <div className="App">
      <form
        className="flex flex-col gap-10 max-w-lg mx-auto my-9"
        onSubmit={formSubmit}
      >
        <select
          onChange={(e) => setForm({...form, selector1: e.target.value})}
          className="border rounded border-black px-5 py-2"
          defaultValue={'DEFAULT'}
        >
          <option value="DEFAULT" disabled>
            Выбор
          </option>
          {Object.keys(weights).map((weight) => (
            <option key={weight} value={weight}>
              {weight}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setForm({...form, selector2: e.target.value})}
          className="border rounded border-black px-5 py-2"
          defaultValue={'DEFAULT'}
        >
          {dataSubgroup ? (
            Object.keys(dataSubgroup).map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))
          ) : (
            <option value="DEFAULT" disabled>
              Опции появятся после выбора 1 поля
            </option>
          )}
        </select>
        <input
          type="number"
          placeholder="Введите длину (км)"
          className="border rounded border-black px-5 py-2"
          value={form.input}
          onChange={(e) => setForm({...form, input: e.target.value})}
        ></input>
        <button type="submit" className="border rounded border-black px-5 py-2">
          Рассчитать
        </button>
      </form>
      {result && <p>Стоимость: {result}</p>}
    </div>
  )
}
export default App
