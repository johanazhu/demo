import logo from './logo.svg';
import './App.css';
import faker from "faker";
import VirtualList from './components/VirtualList';
import IOVirtualList from './components/IOVirtualList';
import GBCRVirtualList from './components/GBCRVirtualList';

let data = [];
for (let id = 0; id < 10000; id++) {
    data.push({
        key: id,
        value: faker.random.words()
        // value: faker.lorem.sentences() // 长文本
    });
}

function App() {
    return (
        <div className="App">
            {/* <VirtualList data={data} /> */}
            <IOVirtualList data={data} height={195} />
            {/* <GBCRVirtualList data={data} /> */}
        </div>
    );
}

export default App;
