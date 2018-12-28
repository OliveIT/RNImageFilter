export class ExposedToJava {
  callbackFnc = null;
  constructor(_callbackFnc) {
      this.callbackFnc = _callbackFnc;
  }

  setImageBufferBase64(base64Data) {
    console.log("BBBBBBBBBBBBBBase64 data", base64Data.length);
    if (this.callbackFnc)
        this.callbackFnc(base64Data);
  }
}