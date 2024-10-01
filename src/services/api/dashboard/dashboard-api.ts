import { BaseApi, buildPageParam, ISessionService } from "../base-api";
import { StockListItem } from "@/types/dashboard-api-types";

export class DashboardApi extends BaseApi {
  constructor(sessionService: ISessionService) {
    super(sessionService);
  }

  async getStocksList({ page }: { page: number }) {
    return this.handleServerQuery<PaginatedResponse<StockListItem>>({
      query: "stocks/list",
      param: buildPageParam(page),
      cache: "no-store",
      isProtected: true,
    });
  }
}