from marshmallow import Schema, fields


class ChatRequestSchema(Schema):
    message = fields.String(
        required=True,
    )


class ChatResponseSchema(Schema):
    answer = fields.String(
        required=True,
    )