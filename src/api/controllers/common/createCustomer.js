const Joi = require('joi');
const createCustomerService = require('../../services/createCustomerService');
exports.createCustomerController = async (req, res) => {
    try {
        const createCustomerData = Joi.object({
            sbu_id: Joi.required(),
            sales_person_id: Joi.required(),
            customer_create_date: Joi.required(),
            customer: Joi.required(),
            segment_id: Joi.required(),
            subsegment_id: Joi.optional(),
            subsubsegment_id: Joi.optional(),
            subsubsubsegment_id: Joi.optional(),
            name: Joi.required(),
            designation: Joi.required(),
            department: Joi.required(),
            mobile: Joi.required(),
            alt_mobile: Joi.optional(),
            email: Joi.required(),
            alt_email: Joi.optional(),
            product_category_id: Joi.required(),
            other_product_category: Joi.required(),
            street_no: Joi.required(),
            street_name: Joi.required(),
            area: Joi.required(),
            location: Joi.required(),
            district: Joi.required(),
            city: Joi.required(),
            state_id: Joi.required(),
            pin: Joi.required()
        })
        const { error, value } = createCustomerData.validate(req.body);
        if(error) {
            console.log(`Invalid create customer data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '')});
        }
        console.log(`Valid create customer data`);
        const resp = await createCustomerService.createCustomer(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp, message: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.json({ success: false, status: 400, message: error.message, response: []})
    }
}

exports.editCustomerController = async (req, res) => {
    try {
        const editCustomerData = Joi.object({
            customer_id: Joi.required(),
            sbu_id: Joi.required(),
            sales_person_id: Joi.required(),
            customer_create_date: Joi.required(),
            customer: Joi.required(),
            segment_id: Joi.required(),
            subsegment_id: Joi.optional(),
            subsubsegment_id: Joi.optional(),
            subsubsubsegment_id: Joi.optional(),
            name: Joi.required(),
            designation: Joi.required(),
            department: Joi.required(),
            mobile: Joi.required(),
            alt_mobile: Joi.optional(),
            email: Joi.required(),
            alt_email: Joi.optional(),
            product_category_id: Joi.required(),
            other_product_category: Joi.required(),
            street_no: Joi.required(),
            street_name: Joi.required(),
            area: Joi.required(),
            location: Joi.required(),
            district: Joi.required(),
            city: Joi.required(),
            state_id: Joi.required(),
            pin: Joi.required()
        })
        const { error, value } = editCustomerData.validate(req.body);
        if(error) {
            console.log(`Invalid edit customer data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '')});
        }
        console.log(`Valid edit customer data`);
        const resp = await createCustomerService.editCustomer(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp, message: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('create customer controller error: ', error);
        return res.json({ success: false, status: 400, message: error.message, response: []})
    }
}