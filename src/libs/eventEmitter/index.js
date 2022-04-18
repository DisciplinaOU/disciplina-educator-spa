export const EventEmitter = () => {
  const events = new Map();

  const add = (type, callback) => {
    const eventsByType = events.get(type) || [];

    eventsByType.push(callback);
    events.set(type, eventsByType);

    return () => {
      const filteredWatchers = events.get(type).filter(watcher => watcher !== callback);

      events.set(type, filteredWatchers);
    };
  };

  const emit = (type, ...payload) => {
    const currentWatchers = events.get(type) || [];

    currentWatchers.forEach(watcher => watcher(...payload));
  };

  return {
    add,
    emit
  };
};
