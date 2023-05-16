use yew::prelude::*;

#[function_component]
fn App() -> Html {
    let counter = use_state(|| 0);
    let onclick = {
        let counter = counter.clone();
        move |_| {
            let value = *counter + 1;
            counter.set(value);
        }
    };
    let li = vec![1,2,3];
    let list = use_state(|| vec![1]);
    let add = {
        let list = list.clone();
        
        Callback::from(move |_| {
            list.set(vec![1,2,3,4]);
        })
    };

    html! {
        <div>
            <button {onclick}>{ "+1" }</button>
            <p>{ *counter }</p>
            <ul>
            {
                li.into_iter().map(|i| html!{<li key={i}>{i}</li>}).collect::<Html>()
            }
            </ul>
            <ul>
            {
                for list.iter().map(|i| html!{<li key={*i}>{i}</li>})
            }
            </ul>
            <button onclick={add}>{"addList"}</button>
        </div>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}