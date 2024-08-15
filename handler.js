const S3 = require("aws-sdk/clients/s3");

const validateInput = (body) => {
  const { key, bucket, sizeBytes } = JSON.parse(body);

  if (!key || typeof key !== "string") {
    throw new Error("Invalid or missing 'key' parameter");
  }

  if (!bucket || typeof bucket !== "string") {
    throw new Error("Invalid or missing 'bucket' parameter");
  }

  if (!sizeBytes || typeof sizeBytes !== "number" || sizeBytes <= 0) {
    throw new Error("Invalid or missing 'sizeBytes' parameter");
  }
};

const createPresignedPost = ({
  bucket,
  key,
  contentType,
  expires = 60,
  sizeBytes = 1000,
}) => {
  const s3 = new S3();
  const params = {
    Expires: expires,
    Bucket: bucket,
    Conditions: [["content-length-range", 0, sizeBytes]],
    Fields: {
      "Content-Type": contentType,
      key,
    },
  };
  return new Promise(async (resolve, reject) => {
    s3.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

exports.create = async (event) => {
  let error = false;
  let data = null;
  try {
    validateInput(event.body);

    const { key, bucket, sizeBytes } = JSON.parse(event.body);
    const presignedPostData = await createPresignedPost({
      key: `${key}`,
      sizeBytes,
      bucket: bucket,
      // contentType: mime.getType(name),
    });
    data = presignedPostData;

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: data,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      // headers,
      body: JSON.stringify({
        error: error,
        message: e.message,
      }),
    };
  }
};
