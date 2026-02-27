export default function ContactMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11570.68!2d4.7772!3d44.0475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b59cd4b8c7e3e3%3A0x40819a5fd979a70!2s30150%20Roquemaure!5e0!3m2!1sfr!2sfr!4v1709078400000!5m2!1sfr!2sfr"
        width="100%"
        height="256"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation Kevin DX — Roquemaure, Occitanie"
        className="h-64"
      />
    </div>
  );
}
