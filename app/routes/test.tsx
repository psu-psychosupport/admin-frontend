import TestDialog from "~/components/TestDialog";
import {useState} from "react";
import Test from "~/components/Test";

export default function TestRoute() {
  const [data, setData] = useState({"name":"Тест 1","questions":[{"type":0,"options":["Ответ 1 (!)","Ответ 2"],"validOptionIndex":0,"title":"Вопрос 1"},{"title":"Вопрос 2","type":1,"options":[],"validOptionIndex":-1,"validTextInput":"Ответ"},{"title":"Вопрос 3","type":0,"options":["Ответ 1","Ответ 2","Ответ 3 (!)","Ответ 4"],"validOptionIndex":2}]});
  const [open, setOpen] = useState(true);

  // const sub = (test) => {
  //   console.log(JSON.stringify(test));
  //   setData(test);
  //   setOpen(false);
  // }



  return <>
    {data && <Test test={data} /> }
    {/*<TestDialog isOpen={open} onClose={() => setOpen(false)} onSubmit={sub} />*/}
  </>
}