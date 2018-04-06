export function createView (viewFields = [], withoutId = false) {
  return (service) => {
    let view = {};
    let fields = viewFields;
    fields.forEach((field) => { view[field] = service[field]; });
    if (!withoutId) {
      view.id = service.id;
    }
    return view;
  };
}

export function createViewList (viewFields, withoutId = false) {
  const view = createView(viewFields, withoutId);
  return (services) => {
    return services.map(service => view(service));
  };
}
