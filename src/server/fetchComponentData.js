export default function fetchComponentData(dispatch, components, params) {
  const initialActions = components.reduce( (prev, current) => {
    return current ? (current.initialActions || []).concat(prev) : prev;
  }, []);

  const promises = initialActions.map(action => dispatch(action(params)));

  return Promise.all(promises);
}
