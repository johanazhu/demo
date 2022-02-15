import logo from './logo.svg';
import './App.css';
import faker from "faker";
import LazyList from './components/LazyList';
import GBCRLazyList from './components/GBCRLazyList';
import IOLazyList from './components/IOLazyList';
import { useState, useRef } from 'react';

let data = [];
for (let id = 0; id < 10000; id++) {
    data.push({
        key: id,
        value: faker.lorem.sentences() // 长文本
    });
}

function App() {

    const [count, setCount] = useState(1)

    return (
        <div className="App">
            {/* <LazyList
                data={data.slice(0, count * 20)}
                changeData={() => {
                    setCount(count => count + 1)
                }} /> */}
            {/* <GBCRLazyList
                data={data.slice(0, count * 20)}
                changeData={() => {
                    setCount(count => count + 1)
                }} /> */}
            <IOLazyList
                data={data.slice(0, count * 20)}
                changeData={(isAdd) => {
                    console.log('isAdd', isAdd)
                    if (isAdd) {
                        setCount(count => count + 1)
                    } else {
                        if (count > 1) {
                            setCount(count => count - 1)
                        }
                    }
                }} />
        </div>
    );
}

export default App;
