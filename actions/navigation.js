export default function(context, payload, done) {
  context.dispatch('CHANGE_ROUTE', payload);
  done();
}
