import Image from "next/image";

interface CountryFlagProps {
  countryCode: string;
  className?: string;
}

export function CountryFlag({ countryCode, className = "" }: CountryFlagProps) {
  const flagUrl = `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;

  return (
    <Image
      src={flagUrl}
      alt={`${countryCode} flag`}
      className={`w-5 h-auto rounded-sm ${className}`}
      loading="lazy"
      width={20}
      height={20}
    />
  );
}
