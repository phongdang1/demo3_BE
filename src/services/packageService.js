import { name } from "ejs";
import db from "../models/index";
const { Op } = require("sequelize");
import paypal from "paypal-rest-sdk";
import { raw } from "body-parser";
require("dotenv").config();
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.CLIENT_ID_PAYPAL,
  client_secret: process.env.CLIENT_SECRET_PAYPAL,
});

let createPaymentViewCv = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let packageInfo = await db.Package.findOne({
          where: { id: data.id },
        });
        if (!packageInfo) {
          resolve({
            errCode: 2,
            errMessage: "Can not find package",
          });
        } else {
          var create_payment_json = {
            intent: "sale",
            payer: {
              payment_method: "paypal",
            },
            redirect_urls: {
              return_url: `${process.env.URL_REACT}/paymentViewCv/success`,
              cancel_url: `${process.env.URL_REACT}/paymentViewCv/cancel`,
            },
            transactions: [
              {
                item_list: {
                  items: [
                    {
                      name: packageInfo.name,
                      sku: "001",
                      price: packageInfo.price,
                      currency: "USD",
                      quantity: 1,
                    },
                  ],
                },
                amount: {
                  currency: "USD",
                  total: packageInfo.price,
                },
                description: "This is the payment description.",
              },
            ],
          };
          paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
              throw error;
            } else {
              resolve({
                errCode: 0,
                link: payment.links[1].href,
              });
            }
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let executePaymentViewCV = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.paymentId || !data.token || !data.PayerID) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let packageInfo = await db.Package.findOne({
          where: { id: data.packageId },
        });
        if (!packageInfo) {
          return resolve({
            errCode: 2,
            errMessage: "Can not find package",
          });
        }
        let execute_payment_json = {
          payer_id: data.PayerID,
          transactions: [
            {
              amount: {
                currency: "USD",
                total: packageInfo.price,
              },
            },
          ],
        };
        let paymentId = data.paymentId;
        paypal.payment.execute(
          paymentId,
          execute_payment_json,
          async function (error, payment) {
            if (error) {
              throw error;
            } else {
              let inforUserPackage = await db.UserPackage.create({
                userId: data.userId,
                packageId: data.packageId,
                poinEarned: packageInfo.price,
                amount: 1,
                price: packageInfo.price,
                statusCode: "PAID",
              });
              if (inforUserPackage) {
                let inforUser = await db.User.findOne({
                  where: { id: data.userId },
                  raw: false,
                });
                inforUser.point += inforUserPackage.poinEarned;
                await inforUser.save({ silent: true });
                let packageInfo = await db.Package.findOne({
                  where: { id: data.packageId },
                  raw: false,
                });
                let company = await db.Company.findOne({
                  where: { id: inforUser.companyId },
                  raw: false,
                });
                company.allowCv += packageInfo.value;
                await company.save({ silent: true });
              }
              resolve({
                errCode: 0,
                errMessage: "Payment success",
              });
            }
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createPaymentHotPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let packageInfo = await db.Package.findOne({
          where: { id: data.id },
        });
        if (!packageInfo) {
          resolve({
            errCode: 2,
            errMessage: "Can not find package",
          });
        } else {
          var create_payment_json = {
            intent: "sale",
            payer: {
              payment_method: "paypal",
            },
            redirect_urls: {
              return_url: `${process.env.URL_REACT}/paymentHotPost/success`,
              cancel_url: `${process.env.URL_REACT}/paymentHotPost/cancel`,
            },
            transactions: [
              {
                item_list: {
                  items: [
                    {
                      name: packageInfo.name,
                      sku: "001",
                      price: packageInfo.price,
                      currency: "USD",
                      quantity: 1,
                    },
                  ],
                },
                amount: {
                  currency: "USD",
                  total: packageInfo.price,
                },
                description: "This is the payment description.",
              },
            ],
          };
          paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
              throw error;
            } else {
              resolve({
                errCode: 0,
                link: payment.links[1].href,
              });
            }
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let executePaymentHotPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.paymentId || !data.token || !data.PayerID) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let packageInfo = await db.Package.findOne({
          where: { id: data.packageId },
        });
        if (!packageInfo) {
          return resolve({
            errCode: 2,
            errMessage: "Can not find package",
          });
        }
        let execute_payment_json = {
          payer_id: data.PayerID,
          transactions: [
            {
              amount: {
                currency: "USD",
                total: packageInfo.price,
              },
            },
          ],
        };
        let paymentId = data.paymentId;
        paypal.payment.execute(
          paymentId,
          execute_payment_json,
          async function (error, payment) {
            if (error) {
              throw error;
            } else {
              let inforUserPackage = await db.UserPackage.create({
                userId: data.userId,
                packageId: data.packageId,
                poinEarned: packageInfo.price,
                amount: 1,
                price: packageInfo.price,
                statusCode: "PAID",
              });
              if (inforUserPackage) {
                let inforUser = await db.User.findOne({
                  where: { id: data.userId },
                  raw: false,
                });
                inforUser.point += inforUserPackage.poinEarned;
                await inforUser.save({ silent: true });
                let packageInfo = await db.Package.findOne({
                  where: { id: data.packageId },
                  raw: false,
                });
                let company = await db.Company.findOne({
                  where: { id: inforUser.companyId },
                  raw: false,
                });
                company.allowHotPost += packageInfo.value;
                await company.save({ silent: true });
              }
              resolve({
                errCode: 0,
                errMessage: "Payment success",
              });
            }
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};
let createPaymentVip = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let packageInfo = await db.Package.findOne({
          where: { id: data.id },
        });
        if (!packageInfo) {
          resolve({
            errCode: 2,
            errMessage: "Can not find package",
          });
        } else {
          var create_payment_json = {
            intent: "sale",
            payer: {
              payment_method: "paypal",
            },
            redirect_urls: {
              return_url: `${process.env.URL_REACT}/paymentVip/success`,
              cancel_url: `${process.env.URL_REACT}/paymentVip/cancel`,
            },
            transactions: [
              {
                item_list: {
                  items: [
                    {
                      name: packageInfo.name,
                      sku: "001",
                      price: packageInfo.price,
                      currency: "USD",
                      quantity: 1,
                    },
                  ],
                },
                amount: {
                  currency: "USD",
                  total: packageInfo.price,
                },
                description: "This is the payment description.",
              },
            ],
          };
          paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
              throw error;
            } else {
              resolve({
                errCode: 0,
                link: payment.links[1].href,
              });
            }
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let executePaymentVip = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.paymentId || !data.token || !data.PayerID) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let packageInfo = await db.Package.findOne({
          where: { id: data.packageId },
        });
        if (!packageInfo) {
          return resolve({
            errCode: 2,
            errMessage: "Can not find package",
          });
        }
        let execute_payment_json = {
          payer_id: data.PayerID,
          transactions: [
            {
              amount: {
                currency: "USD",
                total: packageInfo.price,
              },
            },
          ],
        };
        let paymentId = data.paymentId;
        paypal.payment.execute(
          paymentId,
          execute_payment_json,
          async function (error, payment) {
            if (error) {
              throw error;
            } else {
              let inforUserPackage = await db.UserPackage.create({
                userId: data.userId,
                packageId: data.packageId,
                poinEarned: 200,
                amount: 1,
                price: packageInfo.price,
                statusCode: "PAID",
              });
              if (inforUserPackage) {
                let inforUser = await db.User.findOne({
                  where: { id: data.userId },
                  raw: false,
                });
                inforUser.point += inforUserPackage.poinEarned;
                inforUser.isVip = 1;
                await inforUser.save({ silent: true });
              }
              resolve({
                errCode: 0,
                errMessage: "Payment success",
              });
            }
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkPackageNameExist = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.type) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkPackage = await db.Package.findOne({
          where: {
            [Op.and]: [{ name: data.name }, { type: data.type }],
          },
        });
        if (checkPackage) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleCreateNewPackage = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.price || !data.type) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkPackage = await checkPackageNameExist(data);
        if (checkPackage) {
          return resolve({
            errCode: 2,
            errMessage: "Package is already exist",
          });
        }
        let inforPackage = {
          name: data.name,
          price: data.price,
          type: data.type,
          statusCode: "Active",
        };
        let newPackage = await db.Package.create(inforPackage);
        if (newPackage) {
          resolve({
            errCode: 0,
            errMessage: "Create new package success",
            data: newPackage,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Create new package failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleUpdatePackage = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.name || !data.price || !data.type) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkPackage = await checkPackageNameExist(data);
        if (checkPackage) {
          return resolve({
            errCode: 2,
            errMessage: "Package is already exist",
          });
        }
        let inforUpdate = {
          name: data.name,
          price: data.price,
          type: data.type,
        };
        let update = await db.Package.update(inforUpdate, {
          where: {
            id: data.id,
          },
        });
        if (update) {
          resolve({
            errCode: 0,
            errMessage: "Update package success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Update package failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleActivePackage = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let inforUpdate = {
          statusCode: "Active",
        };
        let update = await db.Package.update(inforUpdate, {
          where: {
            id: data.id,
          },
        });
        if (update) {
          resolve({
            errCode: 0,
            errMessage: "Active package success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Active package failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeactivePackage = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let inforUpdate = {
          statusCode: "inactive",
        };
        let update = await db.Package.update(inforUpdate, {
          where: {
            id: data.id,
          },
        });
        if (update) {
          resolve({
            errCode: 0,
            errMessage: "Deactive package success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Deactive package failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllPackage = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectQuery = {};
      if (data.searchKey) {
        objectQuery.where = { name: { [Op.like]: `%${data.searchKey}%` } };
      }

      let dataPackage = await db.Package.findAndCountAll(objectQuery);
      resolve({
        errCode: 0,
        data: dataPackage.rows,
        count: dataPackage.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getPackageById = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let packageData = await db.Package.findOne({
          where: { id: data.id },
        });
        if (packageData) {
          resolve({
            errCode: 0,
            data: packageData,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Can not find package",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getPackageByType = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.type) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let packageData = await db.Package.findAll({
          where: { type: data.type },
        });
        if (packageData) {
          resolve({
            errCode: 0,
            message: "Get package success",
            data: packageData,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Can not find package",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewPackage: handleCreateNewPackage,
  handleUpdatePackage: handleUpdatePackage,
  handleActivePackage: handleActivePackage,
  handleDeactivePackage: handleDeactivePackage,
  getAllPackage: getAllPackage,
  getPackageById: getPackageById,
  createPaymentViewCv: createPaymentViewCv,
  executePaymentViewCV: executePaymentViewCV,
  createPaymentHotPost: createPaymentHotPost,
  executePaymentHotPost: executePaymentHotPost,
  createPaymentVip: createPaymentVip,
  executePaymentVip: executePaymentVip,
  getPackageByType: getPackageByType,
};
