import { Subscriptions } from './subscriptions';

export interface SubscriptionsResponse extends Subscriptions {
  serviceName: string;
  catalogName: string;
  catalogPrice: number;
}
