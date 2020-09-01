import { IGroupview } from "../groupview";
import { Emitter, Event } from "../../events";
import { ClosePanelResult } from "./parts";
import { IGroupPanel } from "./types";
import {
  BasePanelApi,
  IBasePanelApi,
  PanelDimensionChangeEvent,
} from "../../panel/api";

export interface PanelStateChangeEvent {
  isPanelVisible: boolean;
  isGroupActive: boolean;
}

export interface IPanelApi extends IBasePanelApi {
  onDidPanelStateChange: Event<PanelStateChangeEvent>;
  isPanelVisible: boolean;
  isGroupActive: boolean;
  group: IGroupview;
  close: () => Promise<boolean>;
  setClosePanelHook(callback: () => Promise<ClosePanelResult>): void;
  canClose: () => Promise<ClosePanelResult>;
  onDidDirtyChange: Event<boolean>;
}

export class PanelApiImpl extends BasePanelApi implements IPanelApi {
  private _isPanelVisible: boolean;
  private _isGroupActive: boolean;
  private _group: IGroupview;
  private _closePanelCallback: () => Promise<ClosePanelResult>;

  readonly _onDidPanelStateChange = new Emitter<PanelStateChangeEvent>({
    emitLastValue: true,
  });
  readonly onDidPanelStateChange = this._onDidPanelStateChange.event;

  readonly _onDidDirtyChange = new Emitter<boolean>();
  readonly onDidDirtyChange = this._onDidDirtyChange.event;

  get isGroupActive() {
    return this._isGroupActive;
  }

  get isPanelVisible() {
    return this._isPanelVisible;
  }

  get canClose() {
    return this._closePanelCallback;
  }

  set group(value: IGroupview) {
    this._group = value;
  }

  get group() {
    return this._group;
  }

  constructor(private panel: IGroupPanel, group: IGroupview) {
    super();
    this._group = group;

    this.addDisposables(
      this.onDidPanelStateChange((event) => {
        this._isGroupActive = event.isGroupActive;
        this._isPanelVisible = event.isPanelVisible;
      })
    );
  }

  public close() {
    return this.group.closePanel(this.panel);
  }

  public setClosePanelHook(callback: () => Promise<ClosePanelResult>) {
    this._closePanelCallback = callback;
  }

  public dispose() {
    super.dispose();
  }
}
