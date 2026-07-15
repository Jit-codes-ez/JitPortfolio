import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Row,
  Column,
  Link,
  Hr,
} from "@react-email/components";

interface EmailTemplateProps {
  userName: string;
  contactReason: string;
  userMessage: string;
}

export function EmailTemplate({
  userName,
  contactReason,
  userMessage,
}: EmailTemplateProps) {
  const socials = [
  {
    name: "GitHub",
    url: "https://github.com/Jit-codes-ez",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/jit-hazra",
    icon: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/jit-codes",
    icon: "https://cdn.iconscout.com/icon/free/png-256/leetcode-3521542-2944960.png",
  },
];

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Row>
              <Column style={{ width: "44px" }}>
                <Img
                  src="https://jithazra.vercel.app/favicon-32x32.png"
                  alt="JH"
                  width="40"
                  height="40"
                  style={{ borderRadius: "8px" }}
                />
              </Column>
              <Column>
                <Text style={brandText}>Jit Hazra</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Body */}
          <Section style={body}>
            <Text style={heading}>Hey {userName}! 👋</Text>

            <Text style={text}>
              Thanks for reaching out — your message landed safely in my inbox.
              I personally read every message and will get back to you as soon
              as I can, usually within 24–48 hours.
            </Text>

            <Text style={text}>
              Here&apos;s a copy of what you sent:
            </Text>

            {/* Message recap box */}
            <Section style={recapBox}>
              <Text style={recapLabel}>
                📌 Reason to Contact
              </Text>
              <Text style={recapValue}>{contactReason}</Text>

              <Hr style={recapDivider} />

              <Text style={recapLabel}>
                💬 Your Message
              </Text>
              <pre style={codeBlock}>{userMessage}</pre>
            </Section>

            <Text style={text}>
              While you wait, feel free to check out my latest projects or
              connect with me on LinkedIn. I&apos;m always happy to chat about
              web development, AI, or anything tech.
            </Text>

            {/* CTA Button */}
            <Section style={{ textAlign: "center", marginTop: "28px" }}>
              <Link href="https://jithazra.vercel.app" style={ctaButton}>
                Visit Portfolio →
              </Link>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Socials */}
          <Section style={socialSection}>
            <Text style={socialHeading}>Find me on</Text>
            <table style={socialTable}>
              <tbody>
                <tr>
                  {socials.map((social) => (
                    <td key={social.name} style={socialIconCol}>
                      <Link href={social.url}>
                        <Img
                          src={social.icon}
                          alt={social.name}
                          width="26"
                          height="26"
                          style={socialIcon}
                        />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section>
            <Text style={footerText}>
              You&apos;re receiving this because you submitted the contact form
              at{" "}
              <Link href="https://jithazra.vercel.app" style={footerLink}>
                jithazra.vercel.app
              </Link>
              . If this wasn&apos;t you, you can safely ignore this email.
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} Jit Hazra. All rights reserved.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main: React.CSSProperties = {
  background:
    "radial-gradient(125% 125% at 50% 10%, #000000 40%, #7f1d1d 100%)",
  padding: "40px 20px",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  color: "#ffffff",
  lineHeight: "1.6",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  maxWidth: "600px",
  margin: "0 auto",
  borderRadius: "16px",
  border: "1px solid rgba(220, 38, 38, 0.25)",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  padding: "24px 32px 16px",
};

const brandText: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
  marginLeft: "12px",
  marginTop: "6px",
  color: "#ffffff",
};

const divider: React.CSSProperties = {
  borderColor: "rgba(220, 38, 38, 0.2)",
  margin: "0",
};

const body: React.CSSProperties = {
  padding: "32px",
};

const heading: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#ffffff",
};

const text: React.CSSProperties = {
  fontSize: "15px",
  marginBottom: "16px",
  color: "#e5e7eb",
  lineHeight: "1.7",
};

const recapBox: React.CSSProperties = {
  backgroundColor: "rgba(127, 29, 29, 0.2)",
  border: "1px solid rgba(220, 38, 38, 0.25)",
  borderRadius: "10px",
  padding: "20px 24px",
  marginBottom: "24px",
};

const recapLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#fca5a5",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: "6px",
};

const recapValue: React.CSSProperties = {
  fontSize: "15px",
  color: "#ffffff",
  marginBottom: "16px",
};

const recapDivider: React.CSSProperties = {
  borderColor: "rgba(220, 38, 38, 0.15)",
  margin: "12px 0",
};

const codeBlock: React.CSSProperties = {
  backgroundColor: "rgba(127, 29, 29, 0.3)",
  padding: "14px 16px",
  borderRadius: "8px",
  fontFamily: "monospace",
  fontSize: "14px",
  whiteSpace: "pre-wrap",
  lineHeight: "1.6",
  color: "#fecaca",
  border: "1px solid rgba(220, 38, 38, 0.2)",
  margin: "0",
};

const ctaButton: React.CSSProperties = {
  display: "inline-block",
  background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
  color: "#ffffff",
  padding: "12px 28px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "15px",
};

const socialSection: React.CSSProperties = {
  padding: "24px 32px",
  textAlign: "center",
};

const socialHeading: React.CSSProperties = {
  fontSize: "13px",
  color: "#9ca3af",
  marginBottom: "14px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const socialTable: React.CSSProperties = {
  margin: "0 auto",
  borderSpacing: "10px",
  borderCollapse: "separate",
};

const socialIconCol: React.CSSProperties = {
  backgroundColor: "rgba(220, 38, 38, 0.12)",
  padding: "8px",
  borderRadius: "8px",
  textAlign: "center",
  border: "1px solid rgba(220, 38, 38, 0.2)",
};

const socialIcon: React.CSSProperties = {
  borderRadius: "4px",
  display: "block",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#6b7280",
  textAlign: "center",
  padding: "0 32px",
  marginBottom: "8px",
  lineHeight: "1.6",
};

const footerLink: React.CSSProperties = {
  color: "#dc2626",
  textDecoration: "none",
};