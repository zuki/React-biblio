export default function (context, payload, done) {
  context.dispatch('GET_ITEM', payload);
  done();
};
