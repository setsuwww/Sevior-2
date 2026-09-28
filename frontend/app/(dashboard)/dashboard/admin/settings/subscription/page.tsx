import { getSubscription } from "@/_lib/services/admin-service/settings/subscription.server";

import SubscriptionPageClient from "./page-client";

export default async function SubscriptionPage() {
    const data = await getSubscription();

    return (
        <SubscriptionPageClient data={data} />
    );
}
