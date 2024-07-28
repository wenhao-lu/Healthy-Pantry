import InputArea from '../ui/InputArea';
import Button from '../ui/Button';
import { useState } from 'react';

function Stocks() {
  const [stockName, setStockName] = useState('');
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockUnit, setStockUnit] = useState('g');
  const [stockList, setStockList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!stockName || stockQuantity <= 0) return;

    const newItem = {
      stockName,
      stockQuantity,
      stockUnit,
      date: Date.now(),
    };

    setStockList((preList) => [...preList, newItem]);

    setStockName('');
    setStockQuantity(0);
    setStockUnit('g');
  }

  return (
    <div className="w-screen">
      <p className="bg-emerald-100 py-10 text-center text-xl font-semibold">
        🥪 Manage your food stock 🌮
      </p>
      <form
        className="flex flex-col items-center justify-center bg-emerald-200 py-4"
        onSubmit={handleSubmit}
      >
        <p className="text-l pb-4">What food 🍗 in your fridge? </p>

        <div className="flex justify-center gap-4 pb-4">
          <input
            type="text"
            placeholder="food..."
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            className="w-32 rounded-md border border-gray-300 bg-yellow-50 px-2 py-1.5"
          ></input>
          <input
            type="text"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            className="w-32 rounded-md border border-gray-300 bg-yellow-50 px-2 py-1.5"
          ></input>

          <select
            className="rounded-md bg-yellow-50 text-center"
            value={stockUnit}
            onChange={(e) => setStockUnit(e.target.value)}
          >
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="lb">lb</option>
            <option value="kg">kg</option>
            <option value="oz">oz</option>
            <option value="bag">bag</option>
          </select>
        </div>

        <Button type="primary">Add</Button>
      </form>

      <div className="bg-indigo-50 px-4 py-4">
        <div className="ml-auto mr-auto w-96">
          <p className="pb-2 font-semibold">Food List</p>

          {stockList.length > 0 && (
            <ul>
              {stockList.map((item) => (
                <li
                  key={item.date}
                  className="flex items-center justify-between border-b-2 border-gray-100 px-2"
                >
                  <div className="flex py-1 text-gray-700">
                    <p className="capitalize">{item.stockName}</p>
                    <p className="pl-4 pr-1">{item.stockQuantity}</p>
                    <p>{item.stockUnit}</p>
                  </div>
                  <button className="opacity-60 hover:opacity-100">✖️</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stocks;
