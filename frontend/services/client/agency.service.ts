import axios from "axios";

const API_URL = "http://localhost:8080";

export interface Agency {
    ID: number;
    AgencyName: string;
    OwnerName: string;
    Contact: string;
    Email: string;
    Description: string;
    Website: string;
    Location: string;
    ProfileImage: string;
    Status: string;
    SubscriptionPlan: string;
    SubscriptionStatus: string;
}

export interface AgenciesResponse {
    agencies: Agency[];
}

export async function getAgencies(): Promise<AgenciesResponse> {
    const response = await axios.get<AgenciesResponse>(
        `${API_URL}/api/v1/client/agencies`
    );

    return response.data;
}
