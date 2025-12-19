import pool from "../db.js";
import { isPeakHour, isWeekend } from "../utils/pricingRules.js";

const BASE_PRICES = {
  INDOOR: 500,
  OUTDOOR: 400,
  COACH: 300,
  RACKET: 100,
  SHOES: 150
};

export async function calculatePrice({
  court,
  startTime,
  endTime,
  equipment = {}, 
  coachSelected = false,
}) {
  let basePrice = BASE_PRICES[court.type];
  let total = basePrice;

  const breakdown = [
    { label: "Base court price", amount: basePrice },
  ];

  const { rows: rules } = await pool.query(
    "SELECT * FROM pricing_rules WHERE is_active = true"
  );

  let multiplier = 1;

  for (const rule of rules) {
    if (rule.rule_type === "PEAK" && isPeakHour(startTime)) {
      multiplier *= Number(rule.value);
      breakdown.push({
        label: rule.name,
        amount: `x${rule.value}`,
      });
    }

    if (rule.rule_type === "WEEKEND" && isWeekend(startTime)) {
      multiplier *= Number(rule.value);
      breakdown.push({
        label: rule.name,
        amount: `x${rule.value}`,
      });
    }

    if (
      rule.rule_type === "COURT" &&
      rule.condition?.type === court.type
    ) {
      total += Number(rule.value);
      breakdown.push({
        label: rule.name,
        amount: Number(rule.value),
      });
    }
  }

  total = Math.round(total * multiplier);

  if (coachSelected) {
    total += BASE_PRICES.COACH;
    breakdown.push({
      label: "Coach fee",
      amount: BASE_PRICES.COACH,
    });
  }


  const equipmentEntries = Object.entries(equipment).filter(
    ([, qty]) => qty > 0
  );

  if (equipmentEntries.length > 0) {
    const equipmentIds = equipmentEntries.map(([id]) => Number(id));

    const { rows: equipmentRows } = await pool.query(
      `
      SELECT id, name, price_per_unit
      FROM equipment
      WHERE id = ANY($1)
      `,
      [equipmentIds]
    );

    for (const eq of equipmentRows) {
      const qty = equipment[eq.id];
      const cost = qty * Number(eq.price_per_unit);

      total += cost;

      breakdown.push({
        label: `${eq.name} x${qty}`,
        amount: cost,
      });
    }
  }

  return {
    total,
    breakdown,
  };
}