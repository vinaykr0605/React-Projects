import { loadingSliceDef } from "./loadingslice.js";

function testLoadingSlice() {
  const fakeState = { value: { completed: true } };
  loadingSliceDef.reducers.loadingStarted(fakeState);
  if (fakeState.value.completed) {
    throw new Error('It failed!');
  } else {
    console.log('The loadingStarted reducer works!');
  }
}

testLoadingSlice();