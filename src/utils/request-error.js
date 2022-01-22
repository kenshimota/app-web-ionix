class RequestError {
  constructor(msg, status) {
    this.message = msg;
    this.status = status;
  }

  setMessage(msg) {
    this.message = msg;
  }

  setStatus(status) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }
}

export default RequestError;
