export default function (context, payload, done) {
  context.dispatch('GET_ITEMS', payload);
  done();
};
