import HelpPage from "../../components/frontend/help-page";
import SectionHeader from "../../components/frontend/section-header";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Yardım & Destek - EstatePro",
	description:
		"EstatePro hakkında sıkça sorulan soruları bulun, sorunları giderin ve emlak ofisi yönetim sistemini en verimli şekilde kullanmak için adım adım kılavuzları keşfedin.",
};

export default function page() {
	return (
		<div className="py-12">
			<SectionHeader
				title=""
				heading="Yardım Merkezi & Kaynaklar"
				description="Mülk yönetiminden sözleşme süreçlerine, danışman koordinasyonundan ödeme takibine kadar EstatePro'yu en iyi şekilde nasıl kullanacağınızı öğrenin. Sıkça sorulan soruları inceleyin ya da yardım makalelerimizi keşfedin."
			/>
			<HelpPage />
		</div>
	);
}
