from marshmallow import Schema, fields


class ChatSourceSchema(Schema):
    source = fields.String(required=True)
    dataset = fields.String(required=True)


class ChatRequestSchema(Schema):
    message = fields.String(required=True)


class ChatResponseSchema(Schema):
    message = fields.String(required=True)
    sources = fields.List(
        fields.Nested(ChatSourceSchema),
        required=True,
    )