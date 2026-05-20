#!/bin/bash
# setup-env.sh — Script de configurare variabile de mediu pentru HighUpLabs v4
# Usage: ./setup-env.sh

echo "=== HighUpLabs v4 — Environment Setup ==="
echo ""

# Verifică dacă .env.local există
if [ ! -f .env.local ]; then
    echo "❌ .env.local nu există. Copiază din .env.example:"
    echo "   cp .env.example .env.local"
    echo ""
    exit 1
fi

echo "✅ .env.local există"
echo ""

# Verifică variabilele esențiale
check_var() {
    local var=$1
    local value=$(grep "^$var=" .env.local | cut -d'=' -f2)
    if [ -z "$value" ] || [[ "$value" == *"..."* ]] || [[ "$value" == *"your_"* ]] || [[ "$value" == *"x"* ]]; then
        echo "❌ $var — LIPSEȘTE sau e placeholder"
        return 1
    else
        echo "✅ $var — configurat"
        return 0
    fi
}

echo "=== Verificare variabile locale ==="
check_var "NEXT_PUBLIC_SUPABASE_URL"
check_var "NEXT_PUBLIC_SUPABASE_ANON_KEY"
check_var "META_APP_ID"
check_var "META_APP_SECRET"
check_var "TOKEN_ENCRYPTION_KEY"

echo ""
echo "=== Verificare variabile care necesită acțiune ==="
check_var "RESEND_API_KEY" || echo "   → Generează pe resend.com"
check_var "OPENROUTER_API_KEY" || echo "   → Generează pe openrouter.ai"
check_var "GOOGLE_CLIENT_ID" || echo "   → Opțional: Google Cloud Console"
check_var "GOOGLE_CLIENT_SECRET" || echo "   → Opțional: Google Cloud Console"

echo ""
echo "=== Verificare Vercel ==="
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI disponibil"
    echo "   Verifică variabilele: vercel env ls"
    echo "   Adaugă una nouă: vercel env add <name>"
else
    echo "⚠️  Vercel CLI nu e instalat: npm i -g vercel"
fi

echo ""
echo "=== Verificare Supabase ==="
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI disponibil"
    echo "   Secrets setate:"
    npx supabase secrets list 2>/dev/null | grep -E "RESEND|OPENROUTER" || echo "   ⚠️  Niciun secret AI/Email găsit"
else
    echo "⚠️  Supabase CLI nu e disponibil"
fi

echo ""
echo "=== INSTRUCȚIUNI ==="
echo "1. Completează .env.local cu valorile reale"
echo "2. Setează variabilele în Vercel:"
echo "   vercel env add OPENROUTER_API_KEY"
echo "   vercel env add RESEND_API_KEY"
echo "3. Setează secrets în Supabase Edge Functions:"
echo "   npx supabase secrets set RESEND_API_KEY=sk_..."
echo "4. Deploy: vercel --prod"
