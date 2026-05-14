export class Notification {
  id!: string;
  userId?: string;
  title!: string;
  detail!: string;
  isRead!: boolean;
  createdAt!: Date;
}
