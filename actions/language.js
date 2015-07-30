export default function(context, payload, done) {
  context.dispatch('CHANGE_LANG', payload);
  done();
}
