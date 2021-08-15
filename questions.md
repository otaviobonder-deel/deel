# Questions
1. What is the difference between Component and PureComponent? Give an example where it might break my app.
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
3. Describe 3 ways to pass information from a component to its PARENT.
4. Give 2 ways to prevent components from re-rendering.
5. What is a fragment and why do we need it? Give an example where it might break my app.
6. Give 3 examples of the HOC pattern.
7. What's the difference in handling exceptions in promises, callbacks and async...await.
8. How many arguments does setState take and why is it async.
9. List the steps needed to migrate a Class to Function Component.
10. List a few ways styles can be used with components.
11. How to render an HTML string coming from the server.


# Answers
1. PureComponent avoids rerenders by shallow comparing the React state and props. If they are equal, a rerender will not be performed by React. Since React uses shallow comparison, objects are different even if they are the equal, since the reference of the objects are different. This happens with arrays as well.
2. Context API had some compatibility problems with ShouldComponentUpdate, because if some intermediary component updated with ShouldComponentUpdate, the Context may not receive the update. But with Hooks, Context works much better.
3. By RenderProps, so the parent could access its child state, this would work like:
```jsx
{this.props.render(this.state)}
```
By the Context API, so the parent could be inside a Provider, and the state would be global within its tree, so the child could update the state and the parent would have access to it.
By passing the a `setState` as props to the child, so it could update its parent state calling this function.
4. When using hooks, it's possible to `useCallback` and `useMemo` to memoize a function or a variable, or `React.memo()` to memoize a functional component. When using class components, it's possible to use `shouldComponentUpdate` and `PureComponent` to prevent rerenders.
5. React can't return a list of children, it must return a component. This wouldn't work in React:
```jsx
return (
  <p>Example 1</p>
  <p>Example 2</p>
)
```
But this would work:
```jsx
return (
  <>
    <p>Example 1</p>
    <p>Example 2</p>
  </>
)
```
6. HOC helps reusing the code, but honestly hooks work like a charm and are much easier to use. A HOC that would send events to Analytics everytime a component mounts:
```jsx
export default withMountEvent(MyComponent, 'MyComponent')
```
A HOC to change state when component mounts:
```jsx
function withHasMounted(inputComponent) {
    return class OutputComponent extends React.Component {
        state = {
            hasMounted: false,
        };
    }
    componentDidMount()
    {
        this.setState({hasMounted: true});
    }
    render()
    {
        const {hasMounted} = this.state;
        return <inputComponent {...this.props} hasMounted={hasMounted}/>;
    }
}
```
A HOC to render different components based on state, like login:
```jsx
function withOnlyLogin(InputComponent) {
    return function({ isLogin, ...rest}) {
        if (isLogin) {
            return <InputComponent {...rest} />;
        }
        else {
            return <p>You are not authenticated</p>;
        }
    };
}
```

7. In promises, you usually handle the rejection with a `.catch()`, which will execute if an exception happens. In callbacks you would need to manage the exception in the callback function, since it's not possible to get async exceptions in callbacks. With `async/await` you can write a `try/catch` block, which will capture the exception in the catch block.
8. `setState` takes 2 arguments, the first one is the new state or a function that receives the previous state and should return the new state. The second is an optional callback that will be executed after the state update happens. `setState` is async, but we don't need to use `await` because it's handled by React itself. React batches many `setState` calls to avoid rerenders, that's why it's async.
9. It needs to remove the constructor, props should be received as arguments, state should be moved to hooks (`useState`) and the functional component should return a JSX Element (`render` method is the return of the functional component). Lifecycle methods also needs to be changed to their respective hooks.
10. Styles can be used in the `style` prop, but this triggers unnecessary rerenders. Usually styles are passed as `className` props, using a `css` stylesheet, or using libs like StyledComponents or Material-UI `makeStyles`.
11. It's possible to use the prop `dangerouslySetInnerHTML`, which receives a string, so the HTML can be passed a string and rendered in a `div`.
