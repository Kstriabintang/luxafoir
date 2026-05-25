import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";

export interface OrderConfirmationEmailProps {
  orderId: string;
  items: { name: string; size: string; quantity: number; price: number }[];
  total: number;
  shippingCost: number;
}

const idr = (n: number) =>
  "Rp" + new Intl.NumberFormat("id-ID").format(Math.round(n));

export function OrderConfirmationEmail({
  orderId,
  items,
  total,
  shippingCost,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your LUXAFOIR order {orderId} is confirmed.</Preview>
      <Body style={{ backgroundColor: "#0A0A0A", color: "#F0EDE8", fontFamily: "Helvetica, Arial, sans-serif", margin: 0, padding: "40px 0" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px" }}>
          <Text style={{ fontSize: "26px", fontStyle: "italic", letterSpacing: "1px", color: "#F0EDE8", margin: "0 0 32px" }}>
            LUXAFOIR
          </Text>

          <Heading style={{ fontSize: "22px", fontWeight: 300, color: "#F0EDE8", margin: "0 0 8px" }}>
            Thank you for your order
          </Heading>
          <Text style={{ fontSize: "14px", color: "#A8A8A8", margin: "0 0 4px" }}>
            We&apos;ve received your order and are preparing it with care.
          </Text>
          <Text style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#C9A96E", margin: "0 0 24px" }}>
            Order {orderId}
          </Text>

          <Hr style={{ borderColor: "#2E2E2E", margin: "24px 0" }} />

          {items.map((item, i) => (
            <Row key={i} style={{ marginBottom: "12px" }}>
              <Column>
                <Text style={{ fontSize: "13px", color: "#F0EDE8", margin: 0 }}>{item.name}</Text>
                <Text style={{ fontSize: "11px", color: "#6B6B6B", margin: "2px 0 0" }}>
                  Size {item.size} · Qty {item.quantity}
                </Text>
              </Column>
              <Column align="right">
                <Text style={{ fontSize: "13px", color: "#F0EDE8", margin: 0 }}>
                  {idr(item.price * item.quantity)}
                </Text>
              </Column>
            </Row>
          ))}

          <Hr style={{ borderColor: "#2E2E2E", margin: "24px 0" }} />

          <Row>
            <Column>
              <Text style={{ fontSize: "12px", color: "#A8A8A8", margin: "0 0 6px" }}>Shipping</Text>
            </Column>
            <Column align="right">
              <Text style={{ fontSize: "12px", color: "#A8A8A8", margin: "0 0 6px" }}>
                {shippingCost === 0 ? "Free" : idr(shippingCost)}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text style={{ fontSize: "14px", color: "#F0EDE8", margin: 0 }}>Total</Text>
            </Column>
            <Column align="right">
              <Text style={{ fontSize: "14px", color: "#C9A96E", margin: 0 }}>{idr(total)}</Text>
            </Column>
          </Row>

          <Hr style={{ borderColor: "#2E2E2E", margin: "32px 0 24px" }} />

          <Text style={{ fontSize: "11px", color: "#6B6B6B", lineHeight: "1.6" }}>
            You&apos;ll receive a shipping confirmation with tracking once your order is on its way.
            Crafted for the Distinct.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default OrderConfirmationEmail;
