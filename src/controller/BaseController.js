
class BaseController {
    OkOnlyData(resp, data) {
        resp.status(200).send(data)
    }

    Ok(resp, data) {
        resp.status(200).send({ r: true, data: data })
    }

    Fail(resp, errors) {
        resp.status(200).send({ r: false, errors: errors })
    }

    BadRequest(resp, errors) {
        resp.status(400).send({ r: false, errors: errors })
    }

    ServerError(resp, ex) {
        console.log(ex);
        resp.status(500).send({ ex: `${ex.message}\n ${ex.stack}` })

    }
}

export default BaseController